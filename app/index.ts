export default class App {
    static main(args) {
        AppHelper.runApp();
    }
}
class AppHelper {
    static runApp() {
        const M = 121;
        const RR = 30;
        const CC = 4;
        let ROFFSET;
        let C;
        let JPRIME;
        let N;
        const ORDMAX = 9;
        let MULT = [ORDMAX + 1];
        let J = 1;
        let K = 1;
        let ORD = 2;
        let SQUARE = 9;
        let P = [M + 1];
        P[1] = 2;
        while (K < M) {
            do {
                J += 2;
                if (J == SQUARE) {
                    ORD = ORD + 1;
                    SQUARE = P[ORD] * P[ORD];
                    MULT[ORD - 1] = J;
                }
                N = 2;
                JPRIME = true;
                while (N < ORD && JPRIME) {
                    while (MULT[N] < J)
                        MULT[N] += P[N] + P[N];
                    if (MULT[N] == J)
                        JPRIME = false;
                    N++;
                }
            } while (!JPRIME);
            K++;
            P[K] = J;
        }

        let PNBR = 1;
        let POFFSET = 1;
        while (POFFSET <= M) {
            console.log("----------------------------------------------------");
            console.log("**** The First " + M + " Prime numbers # Page " + PNBR);
            console.log("----------------------------------------------------");
            for (ROFFSET = POFFSET; ROFFSET < POFFSET + RR; ROFFSET++) {
                var line = "";
                for (C = 0; C < CC; C++)
                    if (ROFFSET + C * RR <= M)
                        line += (P[ROFFSET + C * RR] + "").padStart(10, " ");
                console.log(line);
            }
            console.log("\f");
            PNBR += 1;
            POFFSET += (RR * CC);
        }
    }
}