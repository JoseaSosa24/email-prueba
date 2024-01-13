import { useState } from 'react'

import './App.css'


import { Resend } from 'resend';

const resend = new Resend('re_cpREbhPB_2wYLFXZhGpj4xRNp3P81F68G');

interface EmailData {
    from: string;
    to: string[]; 
    subject: string;
    html: string;
  }

// eslint-disable-next-line react-refresh/only-export-components
export const sendEmail = async (emailData: EmailData) => {
  
    const { data, error } = await resend.emails.send(emailData);
  
    if (error) {
      throw new Error(`Error al enviar el correo: ${error}`);
    }
  
    return data;
  };
  

  const App: React.FC = () => {
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
  
      try {
        await sendEmail({
          from: 'Acme <onboarding@resend.dev>',
          to: [formData.email, 'josea_1998@hotmail.com'],
          subject: 'Correo de prueba de llegada',
          html: `<p>Nombre: ${formData.fullName}</p>
                 <p>Correo: ${formData.email}</p>
                 <p>Celular: ${formData.phone}</p>
                 <p>Mensaje: ${formData.message}</p>`,
        });
  
        // Continúa con tu lógica de éxito, por ejemplo, mostrar un mensaje de confirmación
        alert('Correo enviado correctamente');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: '',
        });
      } catch (error) {
        console.error('Error al enviar el correo', error);
      }
    };
  
    return (
      <div>
        <h1>Formulario de Contacto</h1>
        <form onSubmit={handleSubmit}>
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
