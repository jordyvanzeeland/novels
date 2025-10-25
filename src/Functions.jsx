import DataTable from 'datatables.net-dt';
import Config from "./Config.json";

export const initDataTable = () => {
  let table = new DataTable('#DataTable');
    table.destroy();  
    setTimeout(() => {  
        table = new DataTable('#DataTable', {
            autoWidth: true,
            language: {
              url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json',
              search: "",
              searchPlaceholder: "Zoeken"
            },
            dom: 'rt<"bottom"p><"clear">',
            order: []
        });
    }, 300)
}

export const fetchApi = async (method, uri, additionalHeaders, body) => {
  const url = `${Config.API_URL}/api/${uri}`;

  const headers = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...additionalHeaders ? additionalHeaders : ''
  }

  const options = {
      method, 
      headers,
  }

  if (body && method !== "GET") {
      options.body = JSON.stringify(body);
  }

  try {
      const response = await fetch(url, options);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(`fetchApi error [${method} ${uri}]:`, error);
    }
}