import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserByID } from "../services/AuthServices";
import AccountInformationTab from "./AccountInformationTab";
import Tab1Profile from "./Tab1Profile";
import Tab2Profile from "./Tab2Profile";
 
const UserProfileTabs = ({refresh,setRefresh,user}) => {
  const toast = useToast();
  const currentuser = localStorage.getItem("currentuser");
  const user_data = localStorage.getItem("admin") === "user" ? true : false;
 
  return (
    <div>
      {user && (
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>User Information</Tab>
            <Tab display={!user_data && "none" }>Faviourte Hall</Tab>
            <Tab>Account Information</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tab1Profile user={user}  refresh={refresh} setRefresh={setRefresh}/>
            </TabPanel>
            <TabPanel>
              <Tab2Profile user={user} refresh={refresh} setRefresh={setRefresh}/>
            </TabPanel>
            <TabPanel>
              <AccountInformationTab user={user} refresh={refresh} setRefresh={setRefresh}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </div>
  );
};

export default UserProfileTabs;
