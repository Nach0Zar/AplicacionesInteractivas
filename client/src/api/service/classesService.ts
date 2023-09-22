
const prefix = "/classes"

export function getClase(id) {
    //return api.post(prefix + "/registration", {user})
    return {
        responsable: "El gran dopa, grandes comentarios te esperan en cada clase",
        description: "Curso de estadistica avanzada",
        duration: "30 dias",
        frequency: "2 x semana",
        cost: "500",
        category: ["particular"],
        classType: "grupal",
        comments: [
            {
                "author" : "Un humilde alumno",
                "text" : "la clase del gran dopa nunca decepciona, 100% recomendable",
                "score" : "4.5"
            }
        ]
    }
}