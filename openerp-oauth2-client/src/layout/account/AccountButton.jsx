import { useState } from 'react';
import { Avatar, IconButton } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import randomColor from "randomcolor";
import React, { useEffect } from "react";
import { AccountMenu } from "./AccountMenu";

const bgColor = randomColor({
  luminosity: "dark",
  hue: "random",
});

const menuId = "primary-search-account-menu";

function AccountButton() {
  //
  const { keycloak } = useKeycloak();

  const [open, setOpen] = useState(false);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  const anchorRef = React.useRef(null);

  //
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        disableRipple
        component="span"
        ref={anchorRef}
        aria-haspopup="true"
        aria-label="account of current user"
        aria-controls={open ? menuId : undefined}
        onClick={handleToggle}
        sx={{ p: 1.5 }}
      >
        <Avatar
          alt="account button"
          sx={{ width: 36, height: 36, background: bgColor }}
        >
          {keycloak.tokenParsed.name
            ?.split(" ")
            .pop()
            .substring(0, 1)
            .toLocaleUpperCase()}
        </Avatar>
      </IconButton>
      <AccountMenu
        open={open}
        id={menuId}
        anchorRef={anchorRef}
        avatarBgColor={bgColor}
      />
    </>
  );
}

// AccountButton.whyDidYouRender = {
//   logOnDifferentValues: true,
// };

export default React.memo(AccountButton);
