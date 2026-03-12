const form = document.getElementById("solverForm") as HTMLFormElement;
const solveBtn = document.querySelector('button');

solveBtn?.addEventListener("click", (event) => {
    event.preventDefault();

    const a = Number((document.getElementById('a') as HTMLInputElement).value);
    const b = Number((document.getElementById('b') as HTMLInputElement).value);
    const c = Number((document.getElementById('c') as HTMLInputElement).value);
    const d = Number((document.getElementById('d') as HTMLInputElement).value);

    if (a === 0) return;

    
    const p = (3 * a * c - b ** 2) / (3 * a ** 2);
    const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);

    
    const discriminant = (q / 2) * (q/2) + (p / 3) * (p / 3) * (p / 3);

    (document.getElementById('p') as HTMLInputElement).value = String(p);
    (document.getElementById('q') as HTMLInputElement).value = String(q);
    (document.getElementById('Disciminant') as HTMLInputElement).value = String(discriminant);

    let r1: string | number = "Complex";
    let r2: string | number = "Complex";
    let r3: string | number = "Complex";

    if (discriminant < 0) {
        
        const r = 2 * Math.sqrt(-p / 3);
        
        let ratio = -q / (2 * Math.sqrt(-1 * (p / 3) ** 3));
        if (ratio > 1) ratio = 1;
        if (ratio < -1) ratio = -1;
        
        const phi = Math.acos(ratio);

        r1 = r * Math.cos(phi / 3) - b / (3 * a);
        r2 = r * Math.cos((phi + 2 * Math.PI) / 3) - b / (3 * a);
        r3 = r * Math.cos((phi + 4 * Math.PI) / 3) - b / (3 * a);
    } 
    else if (discriminant > 0) {
        
        const uVal = -q / 2 + Math.sqrt(discriminant);
        const vVal = -q / 2 - Math.sqrt(discriminant);

        let u: number = uVal < 0 ? -Math.pow(-uVal, 1 / 3) : Math.pow(uVal, 1 / 3);
        let v: number = vVal < 0 ? -Math.pow(-vVal, 1 / 3) : Math.pow(vVal, 1 / 3);

        r1 = u + v - b / (3 * a);
    } 
    else {
        
        if (p === 0 && q === 0) {
            r1 = r2 = r3 = -b / (3 * a);
        } else {
            const kVal = q / 2;
            let k: number = kVal < 0 ? -Math.pow(-kVal, 1 / 3) : Math.pow(kVal, 1 / 3);

            r1 = k - b / (3 * a);
            r2 = r3 = -2 * k - b / (3 * a);
        }
    }

    (document.getElementById('Value-1') as HTMLInputElement).value = String(r1);
    (document.getElementById('Value-2') as HTMLInputElement).value = String(r2);
    (document.getElementById('Value-3') as HTMLInputElement).value = String(r3);

    const canvas = document.getElementById('graph') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const width = 600;
        const height = 600;
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 20;

        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, centerY); ctx.lineTo(width, centerY);
        ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height);
        ctx.stroke();

        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();

        let first = true;
        for (let pixelX = 0; pixelX <= width; pixelX++) {
            const x = (pixelX - centerX) / scale;
            const y = a * (x ** 3) + b * (x ** 2) + c * x + d;
            const pixelY = centerY - (y * scale);

            if (first) {
                ctx.moveTo(pixelX, pixelY);
                first = false;
            } else {
                ctx.lineTo(pixelX, pixelY);
            }
        }
        ctx.stroke();

        const roots = [r1, r2, r3];
        ctx.fillStyle = '#a855f7';

        roots.forEach(root => {
            const val = Number(root);

            if (!isNaN(val)) {
                const dotX = centerX + (val * scale);
                const dotY = centerY;

                if (dotX >= 0 && dotX <= width) {
                    ctx.beginPath();
                    ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        });

        const equationH2 = document.getElementById('equation');
        if (equationH2) {
            equationH2.innerText = `${a}x³ + ${b}x² + ${c}x + ${d} = 0`;
        }
    }
});
