export function jsxToHtml(element: string): Promise<HTMLDivElement | null> {
    return new Promise((resolve) => {

        const container = document.createElement('div');

        container.innerHTML = element

        const allElements: HTMLElement[] = Array.from(container.querySelectorAll('table, span, br, p, h1, h2, h3, h4, h5'));

        if (allElements) {
            const divBlock = document.createElement('div')
            allElements.forEach(opt => {
                divBlock.appendChild(opt)
            })
            resolve(divBlock);
        } else {
            resolve(null);
        }


        // const container = document.createElement('div');
        // const root = ReactDOM.createRoot(container);
        // const observer = new MutationObserver((mutationsList) => {
        //     for (const mutation of mutationsList) {
        //         if (mutation.addedNodes.length) {
        //             const allElements: HTMLElement[] = Array.from(container.querySelectorAll('table, span, br, p, h1, h2, h3, h4, h5'));
        //             if (allElements) {
        //                 observer.disconnect(); // Отключаем наблюдателя
        //
        //                 const divBlock = document.createElement('div')
        //                 allElements.forEach(opt => {
        //                     divBlock.appendChild(opt)
        //                 })
        //                 resolve(divBlock);
        //             }
        //         }
        //     }
        // });
        //
        // root.render(element);
        //
        // observer.observe(container, {childList: true, subtree: true});
    });
}