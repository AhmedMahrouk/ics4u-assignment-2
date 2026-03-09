const form = document.getElementById("solverForm") as HTMLFormElement;
const solveBtn = document.querySelector('button');

solveBtn?.addEventListener("click", (event) => {
    event.preventDefault();

    const a = Number((document.getElementById('a') as HTMLInputElement).value);
    const b = Number((document.getElementById('b') as HTMLInputElement).value);
    const c = Number((document.getElementById('c') as HTMLInputElement).value);
    const d = Number((document.getElementById('d') as HTMLInputElement).value);

    //prevent division by zero
    if (a === 0) return;

    //calculate p and q
    const p = (3 * a * c - b ** 2) / (3 * a ** 2);
    const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);

    //calculate discriminant
    const discriminant = (q / 2) ** 2 + (p / 3) ** 3;

    (document.getElementById('p') as HTMLInputElement).value = String(p);
    (document.getElementById('q') as HTMLInputElement).value = String(q);
    (document.getElementById('Disciminant') as HTMLInputElement).value = String(discriminant);

    let r1 = "Complex";
    let r2 = "Complex";
    let r3 = "Complex";

    if (discriminant < 0) {
        //case a three distinct real roots
        const r = 2 * Math.sqrt(-p / 3);
        
        let ratio = -q / (2 * Math.sqrt(-1 * (p / 3) ** 3));
        if (ratio > 1) ratio = 1;
        if (ratio < -1) ratio = -1;
        
        const phi = Math.acos(ratio);

        r1 = String(r * Math.cos(phi / 3) - b / (3 * a));
        r2 = String(r * Math.cos((phi + 2 * Math.PI) / 3) - b / (3 * a));
        r3 = String(r * Math.cos((phi + 4 * Math.PI) / 3) - b / (3 * a));
    } 
    else if (discriminant > 0) {
        //case b one real root
        const uVal = -q / 2 + Math.sqrt(discriminant);
        const vVal = -q / 2 - Math.sqrt(discriminant);

        let u: number;
        if (uVal < 0) {
            u = -Math.pow(-uVal, 1 / 3);
        } else {
            u = Math.pow(uVal, 1 / 3);
        }

        let v: number;
        if (vVal < 0) {
            v = -Math.pow(-vVal, 1 / 3);
        } else {
            v = Math.pow(vVal, 1 / 3);
        }

        r1 = String(u + v - b / (3 * a));
    } 
    else {
        //case c real roots with double/triple roots
        if (p === 0 && q === 0) {
            r1 = r2 = r3 = String(-b / (3 * a));
        } else {
            const kVal = q / 2;
            let k: number;
            if (kVal < 0) {
                k = -Math.pow(-kVal, 1 / 3);
            } else {
                k = Math.pow(kVal, 1 / 3);
            }

            r1 = String(k - b / (3 * a));
            r2 = r3 = String(-2 * k - b / (3 * a));
        }
    }

    (document.getElementById('Value-1') as HTMLInputElement).value = r1;
    (document.getElementById('Value-2') as HTMLInputElement).value = r2;
    (document.getElementById('Value-3') as HTMLInputElement).value = r3;
});