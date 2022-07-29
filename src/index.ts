#!/usr/bin/env node
import {cli} from 'cleye'
import {install, lint, sec, test} from '@/commands'

const args = cli(
    {
        name: 'python-env',
        
        version: '1.0',

        commands:
        [
            install,
            lint,
            sec,
            test
        ]
        
    }
)


