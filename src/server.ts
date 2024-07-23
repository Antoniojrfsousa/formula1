import fastify from "fastify";
import cors from "@fastify/cors"

const server = fastify({logger: true});


server.register(cors, {
    origin: "*",

})

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdom"},
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
    { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom"},
    { id: 4, name: "Ferrari", base: "Maranello, Italy"},
    { id: 5, name: "Alpine F1 Team", base: "Enstone, United Kingdom"},
    { id: 6, name: "AlphaTauri", base: "Faenza, Italy"},
    { id: 7, name: "Aston Martin", base: "Silverstone, United Kingdom"},
    { id: 8, name: "Williams", base: "Grove, United Kingdom"},
    { id: 9, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland"},
    { id: 10, name: "Haas F1 Team", base: "Kannapolis, United States"},
];

const drivers = [
    { id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
    { id: 2, name: "Lewis Hamilton", team: "Mercedes"},
    { id: 3, name: "Lando Norris", team: "McLaren"},
    { id: 4, name: "Charles Leclerc", team: "Ferrari"},
    { id: 5, name: "Esteban Ocon", team: "Alpine F1 Team"},
    { id: 6, name: "Pierre Gasly", team: "AlphaTauri"},
    { id: 7, name: "Sebastian Vettel", team: "Aston Martin"},
    { id: 8, name: "George Russell", team: "Williams"},
    { id: 9, name: "Kimi Räikkönen", team: "Alfa Romeo Racing"},
    { id: 10, name: "Mick Schumacher", team: "Haas F1 Team"},
];

server.get("/teams", async (request, response)=>{
    response.type("application/json").code(200)

    return{teams};
});



server.get("/drivers", async(request, response)=>{
    response.type("application/json").code(200);
    return { drivers};
});

interface DriverParams{
    id: string
}



server.get<{Params: DriverParams}>("/teams/:id", async(request, response)=> {
    const id = parseInt(request.params.id)
    const team = teams.find( d => d.id === id );

    if (!team){
        response.type("application/json").code(400);
        return { message: "Driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return { team };
    }
})

server.get<{Params: DriverParams}>("/drivers/:id", async(request, response)=> {
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id );

    if(!driver){
        response.type("application/json").code(404);
        return { message: "Driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return { driver};
    }
})

server.listen({port: 3333}, ()=>{
    console.log("server init")
})