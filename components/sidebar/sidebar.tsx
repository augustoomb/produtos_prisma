'use client'

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HomeIcon, WalletIcon, UsersIcon, ShoppingCartIcon, ServicesIcon, 
    SettingsIcon, ProductsIcon } from './icons'
import LogoMenu from '@/public/logo-F3F4F6.png'
import { MenuItem } from '@/types/MenuItem'

const links: MenuItem[] = [
    { name: 'Home', href: '/dash', icon: HomeIcon },
    { name: 'Clientes', href: '/dash/clients', icon: UsersIcon },
    // { name: 'Compras', href: '/dash', icon: ShoppingCartIcon },
    // { name: 'Produtos', href: '/dash', icon: ProductsIcon },
    // { name: 'Configurações', href: '/dash', icon: SettingsIcon },
    // { name: 'Serviços', href: '/dash', icon: ServicesIcon },
    // { name: 'Vendas', href: '/dash', icon: WalletIcon },
]

export default function Sidebar() {
    const pathname = usePathname();

    return(
        <aside className="hidden md:block sticky top-0 h-screen w-56 bg-gray-100 text-gray-800 p-4">
            <div className="flex items-center mb-4 space-x-1">
                <Image
                    src={ LogoMenu }
                    width="30"
                    height="30"
                    alt="Pagfreela Logo"
                    style={{ aspectRatio: "30/30", objectFit: "cover" }}
                />
                <h1 className="text-lg font-medium">Pagfreela</h1>
            </div>
            <nav className="space-y-2">

                { links.map((link) => {
                    const LinkIcon = link.icon;
                    return(
                        <Link 
                            key={ link.name } 
                            href={ link.href } 
                            className={ clsx(
                                "w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500",
                                {
                                    "bg-gray-200 text-gray-800": pathname === link.href
                                }
                            ) }>
                                <LinkIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">{ link.name }</span>
                            </Link>
                    )
                }) }
            </nav>
        </aside>
    )
}
