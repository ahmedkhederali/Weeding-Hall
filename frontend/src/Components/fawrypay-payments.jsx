import React from "react";

const fawrypay_api_base_url =
  "https://atfawry.fawrystaging.com" + "/fawrypay-api/api";
const fawry_plugin_origin = "https://atfawry.fawrystaging.com";
const fawryplugin_deploy_path = "/atfawry/plugin/";
const fawryplugin_frame_div_id = "fawry-payments";

const DISPLAY_MODE = {
  POPUP: "SEPERATED",
  INSIDE_PAGE: "INSIDE_PAGE",
  SIDE_PAGE: "SIDE_PAGE",
  SEPARATED: "SEPARATED",
};

export const FawryPay = class FawryPay extends React.Component {
  static checkout(chargeRequest, config, accessToken) {
    config.returnUrl = chargeRequest.returnUrl;
    FawryPay.config = config;

    const isMac = navigator.userAgent.match(/Mac OS/);
    const isAppleProduct =
      navigator.vendor.indexOf("Apple") > -1 || window.safari !== undefined;
    if (isMac || isAppleProduct) {
      config.mode = DISPLAY_MODE.SEPARATED;
      chargeRequest.displayMode = DISPLAY_MODE.SEPARATED;
    }
    chargeRequest.paymentSource =
      chargeRequest.paymentSource && chargeRequest.paymentSource != ""
        ? chargeRequest.paymentSource
        : "NEW_PLUGIN";
    this.captureOrderInfo(chargeRequest, config, accessToken);
  }

  static captureOrderInfo(chargeRequest, config, accessToken) {
    var div =
      document.getElementById(fawryplugin_frame_div_id) || FawryPay.createDiv();
    div.innerHTML =
      config.locale === "en"
        ? "loading..., wait a moment please!"
        : "\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644\u060c \u0628\u0631\u062c\u0627\u0621 \u0627\u0644\u0625\u0646\u062a\u0638\u0627\u0631";
    document.body.appendChild(div);
    const params = {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken && "Bearer " + accessToken,
      },
      body: JSON.stringify(chargeRequest),
      method: "POST",
    };

    fetch(`${fawrypay_api_base_url}/payments/init`, params)
      .then((response) => {
        if (!response.ok) throw response;
        return response.text();
      })
      .then((paymentId) => {
        FawryPay.loadPlugin(paymentId, config);
      })
      .catch((error) => {
        div.innerHTML = null;
        if (typeof error.json === "function") {
          error.json().then((body) => {
            onFailureCallBack(body);
          });
        } else {
          onFailureCallBack({ statusDescription: "Connection refused!" });
        }
      });
  }

  static loadPlugin(paymentId, config) {
    const url = `${
      fawry_plugin_origin + fawryplugin_deploy_path
    }?payment-id=${paymentId}&locale=${config.locale || "en"}&mode=${
      config.mode || DISPLAY_MODE.SEPARATED
    }`;
    const style = FawryPay.getIframStyleBasedOnMode(config.mode);

    if (config.mode == DISPLAY_MODE.SEPARATED || config.mode == null) {
      window.open(url, "_self");
    } else if (config.mode === DISPLAY_MODE.POPUP) {
      var div =
        document.getElementById(fawryplugin_frame_div_id) ||
        FawryPay.createDiv();
      div.innerHTML = `<div id="id01" class="modal-f">
			<div class="modal_content">
				<div id="fawry-payments">
					<iframe src=${url}  class="responsive-iframe" frameBorder="0">

					</iframe>
				</div>
				<div id="error"></div>
				</div>
			</div>`;
      document.getElementById("id01").style.display = "block";
      document.body.appendChild(div);
    } else if (config.mode === DISPLAY_MODE.SIDE_PAGE) {
      var div =
        document.getElementById(fawryplugin_frame_div_id) ||
        FawryPay.createDiv();
      div.innerHTML = `<div id="id02">
				  	<div class="container">
						<div id="fawry-payments">
							<iframe id='fawryPayPaymentFrame' src=${url} scrolling="yes" style="border: 0; height: 100vh !important; ${style}"/>

							<div id="error"></div>
						</div>
				  	</div>
				  </div>`;
      document.getElementById("id02").style.display = "block";
      config.mode == DISPLAY_MODE.SIDE_PAGE && div.classList.add("side-page");
      document.body.appendChild(div);
    } else {
      var div =
        document.getElementById(fawryplugin_frame_div_id) ||
        FawryPay.createDiv();
      div.innerHTML = `<iframe id='fawryPayPaymentFrame' src=${url} scrolling="${
        config.mode == DISPLAY_MODE.SIDE_PAGE ? "yes" : "no"
      }" style="border: 0; ${style}"/>`;
      config.mode == DISPLAY_MODE.SIDE_PAGE && div.classList.add("side-page");
      document.body.appendChild(div);
    }
  }

  static getIframStyleBasedOnMode(mode) {
    switch (mode) {
      case DISPLAY_MODE.INSIDE_PAGE:
      case DISPLAY_MODE.SIDE_PAGE:
        return "width:100%; height:800px;";
    }
  }

  static createDiv() {
    const div = document.createElement("div");
    div.setAttribute("id", fawryplugin_frame_div_id);
    return div;
  }
};

export default FawryPay;

const eventMethod = window.addEventListener
  ? "addEventListener"
  : "attachEvent"; // to support IE-8
const eventListener = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"; // to support IE-8

eventListener(messageEvent, receiveMessage, false);

function receiveMessage(message) {
  if (message.origin === fawry_plugin_origin) {
    // message dispatched from the target origin
    document.getElementById(fawryplugin_frame_div_id)?.remove();
    const data = message.data;
    if (data) {
      data.status == 200 || data.statusCode == 200
        ? onSuccessCallBack(data)
        : onFailureCallBack(data);
    }
  }
}

function onSuccessCallBack(data) {
  alert("success")
  if (FawryPay.config) {
    FawryPay.config.onSuccess
      ? FawryPay.config.onSuccess(data)
      : (window.location.reload())
  }
}

function onFailureCallBack(data) {
  alert("faild")

  if (FawryPay.config) {
    FawryPay.config.onFailure
      ? FawryPay.config.onFailure(data)
      : (window.location.reload())
  }
}

function mapToUrlParams(object) {
  return (
    (FawryPay.config.returnUrl.includes("?") ? "&" : "?") +
    Object.keys(object)
      .map((prop) => [prop, object[prop]].map(encodeURIComponent).join("="))
      .join("&")
  );
}
