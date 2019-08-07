const { execFile  } = require('child_process');


module.exports = {
    name: 'express',
    run: async toolbox => {
        const { print, parameters, template } = toolbox;
        
        if(!parameters.first){
            print.error('Port must be specified!');
            return
        }
        await template.generate({
            template: 'file.js.ejs',
            target: 'server/index.js',
            props: { name: parameters.first }
        })

        await execFile('node', ['./server/index.js'], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
    });

        print.success('File created!')
    }
}