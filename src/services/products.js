import { PRODUCTS_API_URL } from "../constants";

export const fetchProjects = () => {
    return new Promise((resolve, reject) => {
        try {
            fetch(PRODUCTS_API_URL).then((response) => {
                if (!response.ok) {
                    reject("Error fetching projects")
                }
                response.json().then((data) => {
                    resolve(data)
                })
            })
          } catch (error) {
            reject(error);
          }
    })
  };