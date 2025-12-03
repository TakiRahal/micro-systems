import { Outlet, useLocation } from "@tanstack/react-router";
import AppTheme from "../../../../theme/AppTheme";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import DashboardHeader from "./dashboard-header";
import flagPalestine from '../../../../assets/palestine.png';
import { useCallback, useRef, useState } from "react";
import DashboardSidebar from "./dashboard-sidebar";
import { getCurrentUser } from "../../../../queries/common.query";

const themeComponents = {
  // ...dataGridCustomizations,
  // ...datePickersCustomizations,
  // ...sidebarCustomizations,
  // ...formInputCustomizations,
};

const MainContainer = (props: { disableCustomTheme?: boolean }) => {
    const theme = useTheme();
    const layoutRef = useRef<HTMLDivElement>(null);
    const location = useLocation()
    getCurrentUser(!!localStorage.getItem('isLoggedIn') && !location?.search?.authentication || location?.search?.authentication)
    

    const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] =
        useState(true);
    const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] =
        useState(false);

    const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

    const isNavigationExpanded = isOverMdViewport
        ? isDesktopNavigationExpanded
        : isMobileNavigationExpanded;
    
    const setIsNavigationExpanded = useCallback(
        (newExpanded: boolean) => {
        if (isOverMdViewport) {
            setIsDesktopNavigationExpanded(newExpanded);
        } else {
            setIsMobileNavigationExpanded(newExpanded);
        }
        },
        [
        isOverMdViewport,
        setIsDesktopNavigationExpanded,
        setIsMobileNavigationExpanded,
        ],
    );

    const handleToggleHeaderMenu = useCallback(
        (isExpanded: boolean) => {
        setIsNavigationExpanded(isExpanded);
        },
        [setIsNavigationExpanded],
    );

    return (
        <AppTheme {...props} themeComponents={themeComponents}>
            <CssBaseline enableColorScheme />
            <Box
                ref={layoutRef}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%',
                }} >
                <DashboardHeader
                    logo={<img src={flagPalestine}
                            alt={'Palestine'}
                            loading="lazy"
                          />}
                    title=""
                    menuOpen={isNavigationExpanded}
                    onToggleMenu={handleToggleHeaderMenu}
                />
                <DashboardSidebar
                    expanded={isNavigationExpanded}
                    setExpanded={setIsNavigationExpanded}
                    container={layoutRef?.current ?? undefined}
                />
                <Outlet />
            </Box>
        </AppTheme>
    )
}
export default MainContainer