// Link.react.test.js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import App from "./App"

test('App renders without exploding', () => {
    render(<App/>)
    expect(screen.getByRole("main")).toBeVisible()
});
