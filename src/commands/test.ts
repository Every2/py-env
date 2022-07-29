import cp from "child_process";
import { command } from "cleye";

export const test = command(
    {
        name: 'test',

    }, (args) => {
        cp.execFile('pytest', ['-v'])
    }
    
)
