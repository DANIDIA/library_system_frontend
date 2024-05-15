import React from 'react';
import { useOutlet } from 'react-router-dom';

export function AuthLayout() {
    const outlet = useOutlet();

    return <div>{outlet}</div>;
}
