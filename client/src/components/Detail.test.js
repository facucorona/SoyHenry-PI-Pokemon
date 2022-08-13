import React from 'react';
import {screen, render} from '@testing-library/react'
import {Landing} from './Landing'

describe('Testing Add prop title: Attack', ()=>{
    it('Must display an Attack title', ()=>{
        render(<Landing/>);
        expect(screen.queryByText(/press the button/i)).toBeInTheDocument();
    })
    
})

