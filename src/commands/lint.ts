import { command } from "cleye"
import cp  from 'child_process'


export const lint = command(
    {
        name: 'lint',

        
    }, (args) => {
        const processes = ['blue', 'isort', 'mypy']
        processes.forEach((execProcess) => {cp.execFileSync(execProcess, ['--check .'])})
        cp.execFileSync('prospector')
    }
 )
