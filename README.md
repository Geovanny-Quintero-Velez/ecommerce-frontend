# 🥗 FoodStore - Tu Comida Saludable a Domicilio  

**FoodStore** es una plataforma de comercio electrónico desarrollada con **Next.js**, diseñada para personas con un estilo de vida ocupado que desean mantener una dieta saludable sin sacrificar tiempo. Permite seleccionar fácilmente comidas listas para consumir, preservadas adecuadamente y entregadas a domicilio.  

---

## 🚨 Problema  

Las personas con un nivel socioeconómico **medio-alto**, que tienen una agenda ocupada, no logran mantener una dieta saludable. **Suelen pedir comida rápida a domicilio**, lo que impacta negativamente su bienestar.  

## 💡 Solución  

**FoodStore** ofrece una plataforma eficiente para seleccionar comidas saludables **de forma rápida y efectiva**, permitiendo recibirlas a domicilio en empaques adecuados para su conservación.  

---

## 🚀 Características  

✅ **Panel de Administración**  
- CRUD completo para usuarios, productos, órdenes y categorías.  
- Paginación en listas para una gestión eficiente.  

✅ **Experiencia de Compra**  
- **Catálogo de productos** con búsqueda y filtrado.  
- **Carrito de compras** persistente en sesión.  
- **Detalle de producto** con información nutricional y opciones de personalización.  

✅ **Gestión de Pedidos**  
- Flujo de compra intuitivo.  
- Procesamiento de pedidos con confirmación automática.  

## 🛠️ Tecnologías
- **Next.js** - Framework de React optimizado para SEO y rendimiento.
- **Tailwind CSS** - Para un diseño moderno y adaptable.
- **TypeScript** - Tipado estático para mayor seguridad y mantenimiento.

## 📂 Configuración del Proyecto

### 1️⃣ Clonar el repositorio  
```bash
git clone https://github.com/Geovanny-Quintero-Velez/ecommerce-frontend.git
cd ecommerce-frontend
```

### 2️⃣ Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto y agrega:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```
⚠️ **IMPORTANTE:** Asegúrate de que el backend esté ejecutándose en el puerto 8000 o cambia la URL según corresponda.

### 3️⃣ Instalar dependencias
```bash
npm install
```

### 4️⃣ Ejecutar la aplicación
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

## ⚡ Requisitos para el Funcionamiento
Para que la plataforma funcione correctamente, **es necesario que el backend esté en ejecución**. Puedes encontrar el backend en el siguiente repositorio:

🔗 **Repositorio Backend:** [ecommerce-backend](https://github.com/Geovanny-Quintero-Velez/ecommerce-backend.git)

Sigue las instrucciones de instalación en ese repositorio para ejecutarlo.

## 🎨 Diseño y Documentación
Para conocer el diseño visual del proyecto, puedes acceder al siguiente enlace de **Figma**:
🔗 [Diseño en Figma](https://www.figma.com/design/iU8ZgBSa4q6IBjwrmbCkWm/Mockups?node-id=0-1&t=W1zDtGOyCXyNKyqB-1)

Además, puedes revisar la documentación detallada del proyecto y sus artefactos en el siguiente documento:
🔗 [Informe del Proyecto](https://docs.google.com/document/d/19vmyPiER2yokJlXZWlHlCjqEgYh51uStDw3VmPUoHIY/edit?usp=sharing)
