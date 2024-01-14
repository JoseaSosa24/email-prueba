import { useState,useRef } from 'react'
import emailjs from '@emailjs/browser';
import './App.css'


  const App: React.FC = () => {
    const form = useRef<HTMLFormElement>(null); // Define el tipo de ref

    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      message: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (form.current) { // Comprueba si la ref tiene valor
        try {
          await emailjs.sendForm('service_nilgym8', 'template_a9h1avh', form.current, 'ugvzJY-afjBrGZYIp')
            .then((result) => {
              console.log(result.text);
              // Lógica de éxito
              alert('Correo enviado correctamente');
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                message: '',
              });
            })
            .catch((error) => {
              console.error('Error al enviar el correo', error);
            });
        } catch (error) {
          console.error('Error interno', error);
        }
      } else {
        console.error('La ref del formulario aún no tiene valor');
      }
    };
  
    return (
      <div>
        <h1>Formulario de Contacto</h1>
        <form ref={form} onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Correo:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Celular:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Mensaje:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  };
  export default App;