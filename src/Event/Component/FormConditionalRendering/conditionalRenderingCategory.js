import { Form } from 'react-bootstrap'
export const conditionalRenderingCategory = (categories, isValid, category, handleCategoryChange) => {


	return (
		<Form.Group className="mb-3">
			<Form.Label>Catégories </Form.Label>
			<Form.Select disabled={isValid} defaultValue={category} onChange={handleCategoryChange}>
				{categories &&
					categories.map((category, index) => (
						<option key={index} value={category}>
							{category}
						</option>
					))}
			</Form.Select>
		</Form.Group>
	)
}