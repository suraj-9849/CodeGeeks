import fs from 'fs';
import { spawn } from 'child_process';
import { set } from 'mongoose';

export function cppExec(
    code: string,
    input: string,
    timeLimit: number,
    memoryLimit: number
): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            const fileName = "code.cpp";
            const filePath = `${__dirname}/${fileName}`;
            fs.writeFileSync(filePath, code, "utf-8");
            const compilation = spawn(`docker run --rm -v ${__dirname}:/exec cpp-runner g++ ${fileName} -o code`, { shell: true });
            let err : Array<string> = [];
            
            compilation.stderr.on('data', (data) => {
                err.push(data.slice(0, 200).toString());
            });

            compilation.on('close', async(result) => {
                if (result === 0) {
                    console.log("Compilation Success");
                    const executionResult = await execute(filePath, input, timeLimit, memoryLimit);
                    resolve(executionResult)
                } else {
                    reject({
                        message: "Compilation Failed",
                        error: JSON.parse(JSON.stringify(err[0])),
                        status: 400
                    });
                }
            })
        } catch (error) {
            console.log("Error running code", error);
            reject({
                message: `Error running code: ${error}`,
                status: 500
            });
        }
    });
}

function execute(
    filePath: string,
    input: string,
    timeLimit: number,
    memoryLimit: number
): any {
    return new Promise((resolve, reject) => {
        try {
            input = input.replace("\r", "");
            const inputFile = `${__dirname}/input.txt`;
            const expectedOutput = '';

            fs.writeFileSync(inputFile, input, 'utf-8');
            const command = spawn(
                'docker',
                [
                    'run',
                    '--rm',
                    '-v',
                    `${__dirname}:/exec`,
                    '--memory',
                    `${memoryLimit}m`,
                    '--memory-swap',
                    `${memoryLimit}m`,
                    '--cpus',
                    '0.5',
                    '--network',
                    'none',
                    'cpp-runner',
                    './code',
                ],
                {
                    stdio: ['pipe', 'pipe', 'pipe'],
                }
            );
            
            command.on('error', (err) => {
                console.error('Failed to start command:', err);
            });
            
                let codeOutput = '';
                command.stdout.on('data', (data) => {
                    const output = data.toString();
                    codeOutput += output;
                });

                command.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });

                const data = command.on('close', (result) => {
                    console.log(`Process exited with code ${result}`);
                    console.log(`Output: ${codeOutput}`);
                    const response = {
                        message: "Execution Success",
                        status: 200,
                        data: {
                            output: codeOutput,
                            expectedOutput: expectedOutput
                        }
                    };
                     resolve(response);
                });
                command.on('error', (error) => {
                    console.error(`Error executing code: ${error}`);
                    throw new Error(`Error executing code: ${error}`);
                });
        } catch (error) {
            console.log("error executing code", error);
            throw new Error(`Error executing code: ${error}`);
        }
    });
}
