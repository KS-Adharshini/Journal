import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import JournalForm from './pages/JournalForm';
import ViewEntry from './pages/ViewEntry';
import UpdateEntry from './pages/UpdateEntry';
import DeleteEntry from './pages/DeleteEntry';
import SubmitEntry from './pages/SubmitEntry';
import MoodSelect from './pages/MoodSelect';
import Quote from './pages/Quote';

const AppMain = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/form" element={<JournalForm />} />
        <Route path="/view" element={<ViewEntry />} />
        <Route path="/update" element={<UpdateEntry />} />
        <Route path="/delete" element={<DeleteEntry />} />
        <Route path="/submit" element={<SubmitEntry />} />
        <Route path="/mood" element={<MoodSelect />} />
        <Route path="/quote" element={<Quote />} />
      </Routes>
    </Router>
  );
};

export default AppMain;

