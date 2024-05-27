import prisma from "../../prisma/client"

export const tester = async(genOutput : String , pid : String) => {
    try{
       const data = await prisma.problem.findUnique({
              where : {
                pid : Number(pid)
              },
              select :{
                totaltcOut : true,
              }
       }) ; 
        const outputs = data?.totaltcOut;
        const backendString = outputs;;
        const formattedString2 = backendString?.replace(/\\n/g, '\n');
        const ll = formattedString2?.replace(/\\t/g, '\t');
        const one = ll?.replace(/ /g, '');
        const backendArray = one?.split('\n');
        // console.log("Backend Array", backendArray);

        const tsc = genOutput;
        const tscFormatted1 = tsc.replace(/\\n/g, '\n');
        const tscFormatted2 = tscFormatted1.replace(/\\t/g, '\t');
        const two = tscFormatted2.replace(/ /g, '');
        const tscArray = two?.split('\n');
        // console.log("TSC Array", tscArray);
        if(backendArray?.length !== tscArray?.length - 1){
            console.log("Length Mismatch", backendArray?.length, tscArray?.length)
            return false;
        }
        for(let i = 0 ; i < backendArray?.length ; i++){
            console.log(backendArray[i], tscArray[i]);
            if(backendArray[i] !== tscArray[i]){
                console.log("Mismatch", backendArray[i], tscArray[i]);
                return false;
            }
        }
        return true;
    }
    catch(err : any){
        console.log("Error in Tester", err);
        return false;
    }
}