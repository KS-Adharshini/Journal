// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JournalForm from './pages/JournalForm';
import SubmitEntry from './pages/SubmitEntry';
import ViewEntryPage from './pages/ViewEntryPage';
import UpdateEntryPage from './pages/UpdateEntryPage';
import DeleteEntryPage from './pages/DeleteEntryPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MoodSelect from './pages/MoodSelect';
import Quote from './pages/Quote';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<JournalForm />} />
        <Route path="/submit" element={<SubmitEntry />} />
        <Route path="/view" element={<ViewEntryPage />} />
        <Route path="/update" element={<UpdateEntryPage />} />
        <Route path="/delete" element={<DeleteEntryPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mood" element={<MoodSelect />} />
        <Route path="/quote" element={<Quote />} />
      </Routes>
    </Router>
  );
};

export default App;
