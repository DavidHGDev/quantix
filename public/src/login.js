const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;

        themeToggle.addEventListener('click', () => {
            if (htmlElement.getAttribute('data-theme') === 'dark') {
                htmlElement.removeAttribute('data-theme');
                themeToggle.textContent = '🌙 Oscuro';
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️ Claro';
            }
        });

const form = document.querySelector('#form-id');
const URL = 'http://localhost:3000'

form.addEventListener('submit', async (event) => {
    //Prevenir que el formulario reinicia la información de JavaScript
    event.preventDefault();

    const usuario = Object.fromEntries(new FormData(form)); // Se crea el objeto con la data, con clave valor, recorriendo el formulario. 

    //Guardar la información en constantes
    // const email = datas.email;
    // const password = datas.password
    const payload = {
        email: usuario.email,
        password: usuario.password
    }
    console.log(payload)

    const span = document.querySelector("#span-admin");
    if(span) span.textContent = ""; // limpiamos los errores anteriores

    //ejecutar la promesa al servidor con try
    try {
        //fetch para comunicar con el servidor 
        const response = await fetch(`${URL}/auth`, {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(payload)
        });
        
        //verificar la respuesta
        if (!response.ok) {
            const data = await response.json();
            
            if (data.errors) {
                const mensajesZod = data.errors.map(e => `${e.campo}: ${e.message}`).join(' | ');
                throw new Error(mensajesZod);
            }
            
            throw new Error(data.message || 'Error desconocido del servidor');
        }

        //Analizar la respuesta y convertir a un JSON
        const data = await response.json();

        

        //guardar el token en localStorage
        localStorage.setItem('token', data.token);

        //redirigir al dashboard
        console.log('Login Exitoso', data);
        //window.onload
    } catch (error) {
        console.error(error.message);
        span.textContent = error.message;
    }
})