import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import {  Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader
} from "react-bs-datatable";
import { getContacts } from "../services/contactService";



function Datatable() {

    const [contacts, setContacts] = useState([]);
      
    useEffect(() => {
      const fetchContacts = async () => {
            try {
              const data = await getContacts();
              setContacts(data);
            } catch (error) {
              console.error('Erro ao carregar contatos', error);
            }
          };
      
          fetchContacts();
    }, []);
  
  const headers: any = [
    {
      prop: "nome",
      title: "Nome"
    },
    {
      prop: "email",
      title: "Username"
    },
    {
      prop: "cep",
      title: "Cep"
    },
    {
      prop: "criadoEm",
      title: "Criado Em"
    },
    {
        prop: "atualizadoEm",
        title: "Atualizado Em"
    }
  ];

  return (
    <DatatableWrapper
      body={contacts}
      headers={headers}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20]
        }
      }}
    >
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination />
        </Col>
      </Row>
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
    </DatatableWrapper>
  );
}

export default Datatable;