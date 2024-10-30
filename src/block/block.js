/**
 * BLOCK: cheatsheets
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */



//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	PanelColor,
	RangeControl,
	FontSizePicker
} = wp.components

const {
	InspectorControls,
	BlockControls,
	ColorPalette,
	AlignmentToolbar,
	RichText,
} = wp.editor.InspectorControls ? wp.editor : wp.blocks



/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'trem/block-cheatsheets', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Cheatsheets' ), // Block title.
	icon: 'lightbulb', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Cheatsheets' )
	],
	attributes: {
		text: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-cgb-block-cheatsheets span',
			default: __( 'e = mc^2' ),
		},
		textAlignment: {
			type: 'string',
			default: 'center',
		},
		textTitle: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-cgb-block-cheatsheets h3',
			default: __( 'Physics' ),
		},
		titleColor: {
			type: 'string',
		},
		spanColor: {
			type: 'string',
		},
		bgColor: {
			type: 'string',
		},
		borderRadius: {
			type: 'number',
			default: '20',
		},
		spanFontSize: {
			type: 'number',
			default: '14',
		}
	
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const {
			isSelected,
			setAttributes,
		} = props
	
		const {
			text,
			textAlignment,
			spanColor,
			bgColor,
			titleColor,
			spanFontSize,
			borderRadius,
			textTitle,
		} = props.attributes


		return [
			isSelected && (
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={textAlignment}
						onChange={ ( nextAlign ) =>  {
							setAttributes( { textAlignment: nextAlign } );
						} }
					/>
				</BlockControls>
			),
			<div 
				className={ `wp-block-cgb-block-cheatsheets` }
				style = { {
					background: bgColor,
					textAlign: textAlignment,
					borderRadius: borderRadius + 'px'
				} }
			>
				<RichText
					tagName={ 'h3' }
					value={ textTitle }
					onChange={ (textTitle) => setAttributes( { textTitle: textTitle } ) }
					formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link'] }
					style={ {
						color: titleColor
					} }
				/>
				<RichText
					tagName={ 'span' }
					placeholder={ __( 'Enter Text' ) }
					value={ text }
					onChange={ ( text ) => setAttributes( { text: text } ) }
					formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link'] }
					style = { {
						color: spanColor,
						fontSize: spanFontSize + 'px'
					} }
				/>
				{
					isSelected &&
					<InspectorControls key='inspector'>
						<PanelColor
							title={ __( 'Title' ) }
							colorValue={ titleColor }
							initialOpen={ true }
						>
							<ColorPalette
								value={ titleColor }
								onChange={ ( colorValue ) => setAttributes( { titleColor: colorValue } ) }
							/>
						</PanelColor>
						<PanelColor
							title={ __( 'Text' ) }
							colorValue={ spanColor }
							initialOpen={ true }
						>
							<ColorPalette
								value={ spanColor }
								onChange={ ( colorValue1 ) => setAttributes( { spanColor: colorValue1 } ) }
							/>
						</PanelColor>
						<FontSizePicker
							value={ spanFontSize }
							onChange={ ( newFontSize ) => setAttributes( { spanFontSize: newFontSize } ) }
						/>
						<PanelColor
							title={ __( 'Background' ) }
							colorValue={ bgColor }
							initialOpen={ true }
						>
							<ColorPalette
								value={ bgColor }
								onChange={ ( colorValue ) => setAttributes( { bgColor: colorValue } ) }
							/>
						</PanelColor>
						<RangeControl
							label={ __( 'Border Radius' ) }
							value={ borderRadius }
							min='1'
							max='30'
							onChange={ ( borderRadius ) => setAttributes( { borderRadius: borderRadius } ) }
						/>
					</InspectorControls>
				}
			</div>
		]
	},


	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const {
			text,
			textAlignment,
			spanColor,
			bgColor,
			titleColor,
			spanFontSize,
			borderRadius,
			textTitle,
		} = props.attributes

		const blockStyle = {
			background: bgColor,
			textAlign: textAlignment,
			borderRadius: borderRadius + 'px'
		} 
		const spanStyle = {
			color: spanColor,
			fontSize: spanFontSize + 'px'
		} 

		return (
			<div className={ `wp-block-cgb-block-cheatsheets` } style={ blockStyle }>
				<h3
					style={ { color: titleColor } }
				>
					{ textTitle } 
				</h3>
				<span
					style={ spanStyle }
				>
					{ text }
				</span>
			</div>
		);
	},
} );
