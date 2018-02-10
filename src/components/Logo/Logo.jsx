/**
 * logo
 */
import { Link } from 'mirrorx';
import React from 'react';
import './Logo.css';

export default function Logo () {
    return (
        <section className="LogoWraper">
            <Link to="/" className="Logo">create-react-app</Link>
        </section>
    )
}
