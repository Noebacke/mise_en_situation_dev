import { useState } from "react";

const Contact = () => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    const validate = (inputs) => {
        let errors = {};
        if (!inputs.name) {
            errors.name = 'Le nom est obligatoire';
        }
        if (!inputs.email) {
            errors.email = 'L\'adresse email est obligatoire';
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            errors.email = 'L\'adresse email est invalide';
        }
        if (!inputs.message) {
            errors.message = 'Le message est obligatoire';
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(inputs);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            const mailto = `mailto:writetotbm@contact.fr?subject=${inputs.name} - ${inputs.email}&body=${inputs.message}`;
            window.location.href = mailto;
        }
    };

    return (
        <>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={inputs.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-field">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-field">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={inputs.message}
                        onChange={handleInputChange}
                    ></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>
                <button type="submit">Envoyer</button>
            </form>
            <p>About Us</p>
        </>
    );
};

export default Contact