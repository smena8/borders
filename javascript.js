// -------- will not work on browsers IE 11 and older --------
 	window.addEventListener('DOMContentLoaded', (event) => {
    	console.log('DOM fully loaded and parsed');
      
      	const sectionBordersAllLovelace = document.querySelectorAll('.section-border-lovelace');
      
      	if (sectionBordersAllLovelace.length > 0) {
          	// 'spread operator' will not work on browsers IE 11 and older
        	[...sectionBordersAllLovelace].every(codeBlock => {
              	
              	codeBlock.parentElement.parentElement.style.padding = '0';
              
              	let codeBlockClassListLovelace = codeBlock.classList;
              	let borderSizeLovelace = parseInt(codeBlock.dataset.lovelaceBorderSize);
              	let borderColorLovelace = codeBlock.dataset.lovelaceBorderColor;
              
              	if (codeBlockClassListLovelace.contains('style-section-all')) {
                	addBordersToAll(codeBlock);
                }
              
              	if (codeBlockClassListLovelace.contains('style-section-single')) {
                	addBordersToSingle(codeBlock);
                }
              	
              	if (codeBlockClassListLovelace.contains('style-section-inner')) {
                	addBordersToInner(codeBlock);
                }
              
              	return true;
            })
        }
      
      	const targetNode = document.querySelector("body");
		const observerOptions = {
  				childList: false,
  				attributes: true,
          		attributeFilter: ['class'],
				subtree: false,
		}
		const observer = new MutationObserver(callback);
		observer.observe(targetNode, observerOptions);

        function callback(mutationList, observer) {
  			mutationList.forEach(mutation => {
   				switch(mutation.target.classList.contains('sqs-edit-mode-active')) {
      				case true:                    	
                    	if (sectionBordersAllLovelace.length > 0) { 	
        					sectionBordersAllLovelace.forEach(codeBlock => {
                              let section = codeBlock.parentElement.closest('section');
                              if (section !== null) {
									section.style.minHeight = '33vh';
                              }
        					})
                        }
        				break;
    			}
  			});
		}


  
	});
  
  
  function addBordersToAll(codeBlock) {
  		let evenPageSectionsLovelace = document.querySelectorAll('.page-section:nth-child(even)');    	
        evenPageSectionsLovelace.forEach(section => {
        	addBorders(section, codeBlock);
        })
    
    	let lastPageSectionLovelace = document.querySelector('.page-section:last-child');
    	lastPageSectionLovelace.style.borderBottom = 'none';
    
    	let footerLovelace = document.querySelector('footer').querySelector('section');
    	addBorders(footerLovelace, codeBlock);
  }
          
  function addBordersToSingle(codeBlock) {
    	// 'closest' not work on browsers IE 11 and older, or Opera mini
  		let parentSectionElemLovelace = codeBlock.parentElement.closest('section')
        addBorders(parentSectionElemLovelace, codeBlock);
  }
  
  function addBordersToInner(codeBlock) {
    	// 'closest' not work on browsers IE 11 and older, or Opera mini
    	let parentSectionElemLovelace = codeBlock.parentElement.closest('section');    
  		let parentContentElemLovelace = codeBlock.parentElement.closest('.content');
        addBorders(parentContentElemLovelace, codeBlock);
    	parentContentElemLovelace.style.paddingLeft = '1em';
    	parentContentElemLovelace.style.paddingRight = '1em';
    	parentContentElemLovelace.style.padding = '1em';
    	let parentContentWrapElemLovelace = codeBlock.parentElement.closest('.content-wrapper');
        parentSectionElemLovelace.style.minHeight = 'max-content';
    	parentContentWrapElemLovelace.style.paddingTop = 0;
    	parentContentWrapElemLovelace.style.paddingBottom = 0;    
  }
  
  function addBorders(element, codeBlock) {    
        let borderColorLovelace = codeBlock.dataset.lovelaceBorderColor;
    	let borderStyleLovelace = codeBlock.dataset.lovelaceBorderStyle;
    	let borderSizeLovelace = parseInt(codeBlock.dataset.lovelaceBorderSize);
  		let borderWidthDict = { borderTop : codeBlock.dataset.lovelaceBorderTop, 
                              	borderBottom : codeBlock.dataset.lovelaceBorderBottom, 
                                borderLeft : codeBlock.dataset.lovelaceBorderLeft, 
                              	borderRight : codeBlock.dataset.lovelaceBorderRight};
    	for (const [key, value] of Object.entries(borderWidthDict)) {
          borderWidthDict[key] = (value === 'yes') ? borderSizeLovelace : 0;
        }
    	element.style.borderWidth = `${borderWidthDict.borderTop}px ${borderWidthDict.borderRight}px ${borderWidthDict.borderBottom}px ${borderWidthDict.borderLeft}px`;
  		element.style.borderStyle = `${borderStyleLovelace}`; // solid dotted dashed none
  		element.style.borderColor = `${borderColorLovelace}`;
    	
  }
