import { command } from "cleye"
import  cp  from  "child_process"

export const sec = command(
    {
        name: 'sec',

        parameters: [
            '<files...>'
        ]
        
    }, (args) => {
        cp.execFileSync('bandit', [`${args._.files}`])
        cp.execFileSync('pip-audit')
    }

)
