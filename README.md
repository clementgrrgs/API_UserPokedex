REST API FOR POKEDEX USER

user Schema:
    {
    pseudo: String,
    nbPokemon: Number,
    friends: [String],
    pokemons: [Number]
    }


GET : get list of all users

localhost:3000/users


POST : add a new user

localhost:3000/users


PUT : update an user specified by user_id

localhost:3000/users/user_id


DELETE : delete an user specified by user_id

localhost:3000/users/user_id