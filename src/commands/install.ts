import {command} from 'cleye'
import fs from 'fs/promises'
import cp from 'child_process' 
import path from 'path'
import {AppError} from '../lib'




export const install = command(
    {
        name: 'install',

        parameters: [
            '<project name>'
        ],
        
        flags: {
            docs: {
                type: Boolean,
                description: "create a directory for documentation, eg. something.md",
                default: false
            },
            
            scripts: {
                type: Boolean,
                description: "Create a directory for scripts, eg. something.sh",
                default: false
            }
        }
        
        
    }, (args) => {
        
        const isPipEnvInstalled = cp.spawnSync('pipenv')
        if (isPipEnvInstalled.stderr === null) {
            const pipDependencies = ['install',
            '--user',
            'pipx'
            ]
            const pipenvSetup = ['install', 'pipenv']
            cp.execFileSync('pip', pipDependencies)
            cp.execFileSync('pipx', pipenvSetup)
        }

        const getParameterName = args._.projectName
        const standardDirectories = ['tests', getParameterName].forEach(async (name) => {
            try {
            await fs.mkdir(path.join(process.cwd(), name))
            }
            catch (err) {
                throw new AppError('Directory already exist')
            }
        })
        
        const createTestFiles = ['__init__.py', 'test.py'].forEach( async (files) => {
            try {
                await fs.writeFile(`tests/${files}`, '')
            }
            catch (err) {
                throw new AppError('Directory not found or already exists')
            }
        })

        fs.writeFile(`${getParameterName}/main.py`, '')
        

        if (args.flags.docs) {
            fs.mkdir(path.join(process.cwd(), 'docs'))
            fs.writeFile('docs/start.md', '')
        }
        
        if (args.flags.scripts) {
            fs.mkdir(path.join(process.cwd(), 'scripts'))
            fs.writeFile('scripts/start.sh', '')
        }

        const dependencies = [
            'install',
            'blue', 
            'isort', 
            'mypy',
            'pytest',
            'bandit',
            'pip-audit',
    ] 
        
        cp.execFileSync('pipenv', dependencies)
        cp.execFileSync('pipenv', ['shell'])
        
    }

)