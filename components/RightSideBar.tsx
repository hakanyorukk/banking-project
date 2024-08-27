import React from "react";

import Card from "./Card";

const RightSideBar = ({
  user,
  accounts = [],
  transactions = [],
}: RightSideBarProps) => {
  //const account = accounts.at(0);
  //console.log(typeof account);
  return (
    <div className="sticky top-12 right-0 m-2 mx-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold py-4">My card</h2>
        <button>+ Add card</button>
      </div>
      <div className="relative flex h-64">
        {accounts.slice(0, 1).map((account, index) => (
          <Card key={account.id} account={account} user={user} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
