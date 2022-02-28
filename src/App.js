import React, { useState } from 'react';

import { makeRequest } from './api/fetch.js';
import { GET, PUT, POST, DELETE } from './api/constants.js';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function App() {
	const [data, setData] = useState("");
	const [path, setPath] = useState("/");
	const [method, setMethod] = useState(GET);
	const [response, setResponse] = useState("");

	const runEndpoint = async () => {
		const endpointData = await makeRequest(path, method, data);
		try {
			setResponse(JSON.stringify(endpointData, null, "\t"));
		} catch(e) {
			console.warn(e);
		}
	}
	
	return (
		<Container>
			<Row>
				<Col>
					<h1>Request</h1>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Endpoint path</Form.Label>
							<Form.Control
								onChange={(e) => setPath(e.target.value)}
								type="text" 
								placeholder="Enter path"
								value={path}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Endpoint method</Form.Label>
							<Form.Select
								onChange={(e) => setMethod(e.target.value)}
								value={method}
							>
								<option>{GET}</option>
								<option>{PUT}</option>
								<option>{POST}</option>
								<option>{DELETE}</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Body (raw)</Form.Label>
							<Form.Control
								as="textarea" 
								placeholder="Enter body data"
								value={data}
								onChange={(e) => setData(e.target.value)}
							/>
						</Form.Group>
						<Button
							onClick={runEndpoint}
							variant="primary" 
							type="button"
						>
							Fetch
						</Button>
					</Form>
				</Col>
				<Col>
					<h1>Response</h1>
					<code>
						{response}
					</code>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
