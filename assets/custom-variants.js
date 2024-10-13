document.addEventListener("DOMContentLoaded", function () {
    const variantOptions = document.querySelectorAll('input[data-variant-id]');
    const productVariantsElement = document.getElementById('product-variants');
    const productVariants = JSON.parse(productVariantsElement.dataset.variants);
    const productTitle = productVariantsElement.dataset.productTitle;

    function updateSoldOutState() {
        console.log("Checking sold-out state for:", productTitle);

        if (productTitle.includes("18K Yellow")) {
            const isAnyVariantSoldOut = productVariants.some(variant => !variant.available);

            variantOptions.forEach(option => {
                const variantId = option.getAttribute('data-variant-id');
                const variant = productVariants.find(v => v.id == variantId);
                const radioButtonGroup = option.closest('.radio__buttons');

                if (variant) {
                    if (variant.available) {
                        radioButtonGroup.classList.remove('sold-out');
                        option.closest('label').classList.remove('sold-out');
                        option.disabled = false;
                    } else {
                        radioButtonGroup.classList.add('sold-out');
                        option.closest('label').classList.add('sold-out');
                        option.disabled = true; 
                    }
                }
            });
       
            if (isAnyVariantSoldOut) {
                variantOptions.forEach(option => {
                    const variantId = option.getAttribute('data-variant-id');
                    const variant = productVariants.find(v => v.id == variantId);
                    option.disabled = variant ? !variant.available : true; 
                });
            } else {
                console.log("All variants are available.");
            }
        }
    }

    updateSoldOutState();

    const countdownElement = document.querySelector('.variant__countdown'); // Adjust selector as needed
    if (countdownElement) {
        countdownElement.addEventListener('inventoryUpdated', updateSoldOutState);
    }

    variantOptions.forEach(option => {
        option.addEventListener('change', updateSoldOutState);
    });
});
