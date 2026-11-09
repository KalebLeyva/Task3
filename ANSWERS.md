# Checkpoint Questions — Task 3

### 1. ¿Qué hace la prop `visible` de `Modal` y por qué la controlamos con `useState`?
La prop `visible` determina si el modal se muestra en la pantalla por encima de la vista actual o si permanece oculto[cite: 31]. Se controla mediante `useState` para que React administre su ciclo de vida de forma declarativa, renderizando nuevamente la interfaz y ejecutando las animaciones de apertura o cierre cada vez que el valor booleano cambia[cite: 31].

### 2. ¿Para qué sirve `onRequestClose`? ¿Qué sucede en Android si no cierras el modal dentro de ella?
La función `onRequestClose` es un callback obligatorio para interceptar el botón físico o el gesto nativo de "atrás" en Android mientras el modal está activo[cite: 25, 29, 31]. Si no se actualiza el estado para ocultar el modal dentro de esta función, el sistema operativo capturará la acción de retroceso sin cerrar la vista, dejando al usuario atrapado en el modal[cite: 25, 31].

### 3. ¿Cuál es el efecto de `transparent={true}`? Nombra los tres valores posibles de `animationType`.
La propiedad `transparent={true}` permite que la pantalla base de la aplicación continúe visible por debajo del contenido del modal, lo que hace posible mostrar fondos semitransparentes u oscurecidos (`rgba(0, 0, 0, 0.5)`)[cite: 25, 26, 31]. Los tres valores posibles para `animationType` son `'none'`, `'slide'` y `'fade'`[cite: 25, 29, 31].

### 4. ¿Por qué existe `ScrollView`? ¿Qué pasa con una `View` larga sin él? ¿Cuándo elegirías `FlatList` en su lugar?
`ScrollView` existe para permitir el desplazamiento cuando el contenido excede el tamaño físico de la pantalla, ya que dentro de una `View` tradicional el contenido que sobrepasa el borde se corta y queda inaccesible para el usuario[cite: 31]. Se debe elegir `FlatList` en lugar de `ScrollView` al renderizar listas largas o dinámicas de datos, dado que `FlatList` virtualiza los elementos en memoria y solo renderiza los que están visibles en ese momento[cite: 31].

### 5. ¿Cuál es la diferencia entre las props `style` y `contentContainerStyle` de un `ScrollView`?
La prop `style` aplica reglas visuales al contenedor exterior que enmarca y delimita la ventana de desplazamiento en la pantalla (como su tamaño o color de fondo)[cite: 31]. Por otro lado, `contentContainerStyle` estiliza el contenedor interno que agrupa a todos los elementos hijos, siendo el lugar indicado para aplicar márgenes internos (*padding*), alineaciones y espaciados que se mueven junto al contenido al hacer scroll[cite: 27, 29, 31].

### 6. ¿Para qué sirve `SafeAreaView` y qué zonas del dispositivo protege? ¿Por qué usamos `react-native-safe-area-context`?
`SafeAreaView` añade márgenes internos automáticos para evitar que la interfaz gráfica quede oculta o superpuesta bajo elementos del hardware como el *notch*, la barra de estado superior, esquinas redondeadas o la barra inferior de navegación[cite: 30, 31]. Se utiliza la librería `react-native-safe-area-context` porque ofrece soporte consistente tanto para iOS como para Android, actualizando los márgenes de forma dinámica ante rotaciones de pantalla o apertura del teclado[cite: 30, 31].

### 7. Escribe las tres mejores prácticas del checklist del Paso 5 en tus propias palabras y da un ejemplo de cuándo un modal no es una buena idea.
Las tres mejores prácticas consisten en: mantener un único modal por pantalla enfocado exclusivamente en acciones cortas, usar `ScrollView` solo para conjuntos pequeños y limitados de elementos (como de 5 a 8 componentes), y proteger siempre la interfaz envolviéndola en un `SafeAreaView`[cite: 30, 31]. Un modal no es una buena idea para flujos extensos de navegación por pasos o pantallas de exploración profunda (como un catálogo entero de compras o un registro multi-formulario), escenarios donde una pantalla de navegación convencional resulta mucho más clara y accesible[cite: 31].