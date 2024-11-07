/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from '../../context/layoutcontext';
import { MenuProvider } from '../../context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '../../lib/types';
import { NavigationMenuConfig } from '@/src/config/navigationMenuConfig';

const AppMenu = () => {



    return (
        <MenuProvider>
            <ul className="layout-menu">
                {NavigationMenuConfig.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
