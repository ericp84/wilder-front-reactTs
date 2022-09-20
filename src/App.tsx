import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ModalCreate from "./components/ModalCreate/ModalCreate";
import WilderCard from "./components/WilderCard/WilderCard";
import Modal from "./components/Modal/Modal";
import Footer from "./components/Footer/Footer";

function App() {
  const [wilders, setWilders] = useState<Array<string>>([]);
  const [id, setId] = useState<Number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchData = async (): Promise<Function> => {
    try {
      const request = await fetch("http://localhost:3000/api/wilders");
      const response = await request.json();
      setWilders(response);
      return response;
    } catch (err: any) {
      throw new Error("Function not implemented.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCallback = (idFromWilder: number) => {
    setId(idFromWilder);
  };

  const handleCreateWilder = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, [id, showModal]);

  return (
    <div>
      <Header />
      <main className="container">
        <h2>Wilders</h2>
        <button className="btn-modal" onClick={handleCreateWilder}>
          Create Wilder
        </button>
        <ModalCreate
          onClose={(): any => setShowModal(false)}
          show={showModal}
          onWilderAdded={() => fetchData}
        />
        <WilderCard
          wilder={wilders}
          idFromWilder={handleCallback}
          onWilderDeleted={() => fetchData()}
        />
        <Modal
          show={undefined}
          id={undefined}
          refresh={function (): void {}}
          onClose={function (): void {}}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
