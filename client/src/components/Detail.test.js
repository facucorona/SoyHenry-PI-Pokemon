import React from 'react';
import {screen, render} from '@testing-library/react'
import {Detail} from './Detail'

describe('Testing Detail prop title: Attack', ()=>{
    it('Must display an Attack title', ()=>{
        render(<Detail/>);
        expect(screen.queryByText(/Attack:/i)).toBeInTheDocument();
    })
    
})

