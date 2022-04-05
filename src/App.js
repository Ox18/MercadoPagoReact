import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FORM_ID = "payment-form";

function App() {
	const [preferenceId, setPreferenceId] = useState(null);

	useEffect(() => {
		// luego de montarse el componente, le pedimos al backend el preferenceId
		axios
			.post("http://localhost:5001/iduplexweb/us-central1/api/v1/orders", {
				orders: [
					{
						title: "Zapatillas Nike",
						unit_price: 100,
						quantity: 1,
					},
					{
						title: "Pantalones Nike",
						unit_price: 100,
						quantity: 1,
					},
					{
						title: "Camiseta Nike",
						unit_price: 100,
						quantity: 1,
					},
				],
			})
			.then((order) => {
        const { preferenceId } = order.data;
				setPreferenceId(preferenceId);
			});
	}, []);

	useEffect(() => {
		if (preferenceId) {
			// con el preferenceId en mano, inyectamos el script de mercadoPago
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src =
				"https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js";
			script.setAttribute("data-preference-id", preferenceId);
			const form = document.getElementById(FORM_ID);
			form.appendChild(script);
		}
	}, [preferenceId]);

	return (
		<>
			<div>Mercadopago Prueba</div>
			<form id={FORM_ID} method="GET" />
		</>
	);
}

export default App;
