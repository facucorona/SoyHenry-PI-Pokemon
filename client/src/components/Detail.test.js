import React from 'react';
import {screen, render} from '@testing-library/react'
import {Landing} from './Landing'

describe('Testing Detail prop title: Attack', ()=>{
    it('Must display an Attack title', ()=>{
        render(<Landing/>);
        const  button =screen.getByRole('button', {name:'enter button'})
        expect(button).toBeInTheDocument();
    })
    
})

