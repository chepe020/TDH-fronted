// App.jsx
import React from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MenuComponent } from './components/Menu/MenuComponent';
import { PrincipalPage } from './components/Dashboard/PrincipalPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { TaskPage } from './pages/tasks/TaskPage';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { CategoryPage } from './pages/category/CategoryPage';
import { SettingPage } from './pages/setting/SettingPage';
import { PublicationPage } from './pages/Publicationes/PublicationPage';
import { ComentsPage } from './pages/Coment/ComentsPage';
import { ProductsPage } from './pages/changePoints/ProductsPage';
import { FalshCardsPage } from './pages/FalshCards/FalshCardsPage';
import { SuccessesPage } from './pages/Successes/SuccessesPage';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Rutas protegidas/anidadas dentro de dashboard */}
        <Route path="/dashboard" element={<MenuComponent />}>
          <Route index element={<PrincipalPage />} />
          <Route path='tasks' element={<TaskPage />} />
          <Route path='calendar' element={<CalendarPage/>}/>
          <Route path='category' element={<CategoryPage/>}/>
          <Route path='setting' element={<SettingPage/>}/>
          <Route path='publication' element={<PublicationPage/>} />
          <Route path='comentario' element={<ComentsPage/>} />
          <Route path='products' element={<ProductsPage/>}/>
          <Route path='falshcard' element={<FalshCardsPage/>} />
          <Route path='logros' element={<SuccessesPage/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </IonApp>
  );
}

export default App;
