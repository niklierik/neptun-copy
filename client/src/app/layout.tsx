"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>Neptun++</title>
                <meta lang="hu" />
            </head>
            <body>{children}</body>
        </html>
    );
}
