'use client';
import React, { useState, createContext, useEffect, useContext } from 'react';
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '../lib/types';
import { PrimeReactContext } from 'primereact/api';

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ChildContainerProps) => {
    // Default layout config
    const defaultLayoutConfig: LayoutConfig = {
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
    };

    // Initialize state with default config
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(defaultLayoutConfig);
    const { changeTheme } = useContext(PrimeReactContext);

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    useEffect(() => {
        const savedConfig = localStorage.getItem('layoutConfig');
        if (savedConfig) {
            try {
                const parsedConfig = JSON.parse(savedConfig);
                setLayoutConfig((prevConfig) => ({
                    ...prevConfig,
                    ...parsedConfig
                }));

                console.log('lox')
                if (parsedConfig.theme && parsedConfig.theme !== defaultLayoutConfig.theme) {
                    changeTheme?.(defaultLayoutConfig.theme, parsedConfig.theme, 'theme-css');
                }
            } catch (error) {
                console.error("Failed to parse layout config from localStorage:", error);
            }
        }
    }, [changeTheme]);

    // Save layoutConfig to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('layoutConfig', JSON.stringify(layoutConfig));
    }, [layoutConfig]);

    const onMenuToggle = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
        }));
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: !prevLayoutState.profileSidebarVisible
        }));
    };

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar
    };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
