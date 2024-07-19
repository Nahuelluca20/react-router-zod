import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes
import Table, { tableLoader } from "./routes/table/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/table",
    loader: tableLoader,
    element: <Table />,
  },
  // {
  //   path: "/pokemons",
  //   loader: pokemonsLoader,
  //   element: <Pokemons />,
  //   children: [
  //     {
  //       path: ":pokemon-name",
  //       element: <PokemonModal />,
  //       loader: pokemonModaLoader,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
