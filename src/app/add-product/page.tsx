'use client'
import React, { useState, ChangeEvent } from 'react';
import {
    Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography,
    Container,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    OutlinedInput,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';
import Navigation from '../pages/Navigation';

const ProductForm = () => {
    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');
    const [details, setDetails] = useState([{ key: '', value: '' }]);
    const [colorOptions, setColorOptions] = useState([{ color: '', hex: '' }]);
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('3');
    const [productAvailable, setProductAvailable] = useState(false);
    const [categories, setCategories] = useState('');
    const [size, setSize] = useState('S');
    const [launchDate, setLaunchDate] = useState('');
    const [tags, setTags] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [productImages, setProductImages] = useState<File[]>([]);
    const [productQuestions, setProductQuestions] = useState([{ question: '', answer: '' }]);

    const [productSpeciality, setProductSpeciality] = useState<string[]>([]);
    const specialities = ['Organic', 'Vegan', 'Gluten-Free', 'Non-GMO', 'Handmade', 'Eco-Friendly'];
    const handleSpecialityChange = (event: ChangeEvent<{ value: unknown }>) => {
        setProductSpeciality(typeof event.target.value === 'string'
            ? event.target.value.split(',')
            : event.target.value as string[]
        );
    };

    const handleAddSpeciality = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.currentTarget.value)
            setProductSpeciality([...productSpeciality, event.currentTarget.value])
        event.currentTarget.value = ''
    }

    const handleDeleteSpeciality = (chipToDelete: string) => {
        setProductSpeciality((chips) => chips.filter((chip) => chip !== chipToDelete))
    }

    const handleQuestionChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const updatedQuestions = [...productQuestions]
        updatedQuestions[index][name] = value
        setProductQuestions(updatedQuestions)
    }
    const handleAddQuestion = () => {
        setProductQuestions([...productQuestions, { question: '', answer: '' }]);
    };

    const handleDetailChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedDetails = [...details];
        updatedDetails[index][name] = value;
        setDetails(updatedDetails);
        console.log(updatedDetails, 'ud')
    };

    const handleColorChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedColors = [...colorOptions];
        updatedColors[index][name] = value;
        setColorOptions(updatedColors);
        console.log(updatedColors, 'uc')
    };

    const handleAddDetail = () => {
        setDetails([...details, { key: '', value: '' }]);
    };

    const handleAddColorOption = () => {
        setColorOptions([...colorOptions, { color: '', hex: '' }]);
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };
    const handleImagesUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setProductImages(filesArray);
            console.log(filesArray, fi)
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.preventDefault())
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('rating', rating);
        formData.append('productAvailable', productAvailable.toString());
        formData.append('size', size);
        formData.append('launchDate', launchDate);
        formData.append('stockQuantity', stockQuantity);

        // details.forEach((detail, index) => {
        //     formData.append(`details[${index}][key]`, detail.key);
        //     formData.append(`details[${index}][value]`, detail.value);
        // });
        // console.log(details, 'd')
        // console.log(formData,'f')
        // colorOptions.forEach((color, index) => {
        //     formData.append(`colorOptions[${index}][color]`, color.color);
        //     formData.append(`colorOptions[${index}][hex]`, color.hex);
        // });
        // console.log(colorOptions, 'co')
        formData.append('tags', tags.split(',').map(tag => tag.trim()).filter(tag => tag).join(','));
        formData.append('categories', categories.split(',').map(category => category.trim()).filter(category => category).join(','));


        // formData.append('categories', JSON.stringify(categoriesArray));
        // formData.append('tags', JSON.stringify(tagsArray));

        formData.append('details', JSON.stringify(details));
        formData.append('colorOptions', JSON.stringify(colorOptions));

        console.log(formData, 'f')
        if (image) {
            formData.append('image', image);
        }
        productImages.forEach((img) => {
            formData.append('productImages', img);
        });
        console.log(productImages, 'pi')
        formData.append('productQuestions', JSON.stringify(productQuestions));
        formData.append('productSpeciality', productSpeciality);

        try {
            const response = await axios.post('http://localhost:9090/api/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product created:', response.data);
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    const handleSizeChange = (event: SelectChangeEvent) => {
        setSize(event.target.value);
    };

    const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRating(event.target.value);
    };

    return (<>
        {/* <Navigation /> */}
        <Container component="form" onSubmit={handleSubmit}>

            <Typography variant="h4" component="h2" color="secondary" gutterBottom>
                Create New Product
            </Typography>

            <TextField
                label="Product Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required

                margin="normal"
            />

            <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required

                margin="normal"
            />


            <TextField
                label="Price"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required

                margin="normal"
            />
            {/* {productQuestions.map((qna, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Question {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            label="Question"
                            variant="outlined"
                            name="question"
                            value={qna.question}
                            onChange={(e) => handleQuestionChange(index, e)}
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Answer"
                            variant="outlined"
                            name="answer"
                            value={qna.answer}
                            onChange={(e) => handleQuestionChange(index, e)}
                            required
                            margin="normal"
                        />
                    </AccordionDetails>
                </Accordion>
            ))} */}

            {productQuestions.map((question, index) => (
                <div key={index}>
                    <TextField
                        label="Question"
                        variant="outlined"
                        name="question"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(index, e)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Answer"
                        variant="outlined"
                        name="answer"
                        value={question.answer}
                        onChange={(e) => handleQuestionChange(index, e)}
                        required
                        margin="normal"
                    />
                </div>
            ))}
            <Button onClick={handleAddQuestion} variant="outlined" sx={{ my: 2 }}>
                Add Question
            </Button>
            <Typography variant="h5" color='secondary' gutterBottom>Product Speciality</Typography>
            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {productSpeciality.map((speciality, index) => (
                    <Chip
                        key={index}
                        label={speciality}
                        onDelete={() => handleDeleteSpeciality(speciality)}
                        color="primary"
                    />
                ))}
            </Box>
            <TextField
                variant="outlined"
                placeholder="Add a speciality and press Enter"
                onKeyDown={handleAddSpeciality}
                fullWidth
                margin="normal"
            /> */}
            <FormControl fullWidth margin="normal">
                <InputLabel>Product Speciality</InputLabel>
                <Select
                    multiple
                    value={productSpeciality}
                    onChange={handleSpecialityChange}
                    input={<OutlinedInput label="Product Speciality" />}
                    renderValue={(selected) => (
                        <div>
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </div>
                    )}
                >
                    {specialities.map((speciality) => (
                        <MenuItem key={speciality} value={speciality}>
                            {speciality}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {details.map((detail, index) => (
                <div key={index}>
                    <TextField
                        label="Key"
                        variant="outlined"
                        name="key"
                        value={detail.key}
                        onChange={(e) => handleDetailChange(index, e)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Value"
                        variant="outlined"
                        name="value"
                        value={detail.value}
                        onChange={(e) => handleDetailChange(index, e)}
                        required
                        margin="normal"
                    />
                </div>
            ))}
            <Button onClick={handleAddDetail} variant="outlined">
                Add Detail
            </Button>

            {colorOptions.map((color, index) => (
                <div key={index}>
                    <TextField
                        label="Color"
                        variant="outlined"
                        name="color"
                        value={color.color}
                        onChange={(e) => handleColorChange(index, e)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Hex Code"
                        variant="outlined"
                        name="hex"
                        value={color.hex}
                        onChange={(e) => handleColorChange(index, e)}
                        required
                        margin="normal"
                    />
                </div>
            ))}
            <Button onClick={handleAddColorOption} variant="outlined">
                Add Color Option
            </Button>

            <FormControl margin="normal">
                <FormLabel>Rating</FormLabel>
                <RadioGroup value={rating} onChange={handleRatingChange}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                </RadioGroup>
            </FormControl>

            <FormControl margin="normal">
                <InputLabel>Size</InputLabel>
                <Select value={size} label="Size" onChange={handleSizeChange}>
                    <MenuItem value="S">S</MenuItem>
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="L">L</MenuItem>
                    <MenuItem value="XL">XL</MenuItem>
                    <MenuItem value="XXL">XXL</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Launch Date"
                type="date"
                value={launchDate}
                onChange={(e) => setLaunchDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required

                margin="normal"
            />

            <TextField
                label="Categories (comma-separated)"
                variant="outlined"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                helperText="Enter categories separated by commas"
                margin="normal"
            />

            <TextField
                label="Tags (comma-separated)"
                variant="outlined"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                helperText="Enter tags separated by commas"
                margin="normal"
            />

            <TextField
                label="Stock Quantity"
                variant="outlined"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required

                margin="normal"
            />

            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={productAvailable}
                            onChange={(e) => setProductAvailable(e.target.checked)}
                        />
                    }
                    label="Product Available"
                />
            </FormGroup>

            <Button variant="contained" component="label" margin="normal" color="secondary">
                Upload Product Image
                <input type="file" hidden onChange={handleImageUpload} accept="image/*" />

            </Button>
            <Button variant="contained" component="label" margin="normal" color="secondary">
                Upload Additional Product Images
                <input type="file" hidden multiple onChange={handleImagesUpload} accept="images/*" />

            </Button>
            <Button variant="contained" color="primary" type="submit" margin="normal">
                Create Product
            </Button>
        </Container>
    </>
    );
};

export default ProductForm;
