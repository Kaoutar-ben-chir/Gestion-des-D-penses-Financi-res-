// Fonction pour afficher la situation financière
function afficherSituationFinanciere() {
    const salaireMensuel = parseFloat(document.getElementById('salaireMensuel').value);
    const salaireAnnuel = parseFloat(document.getElementById('salaireAnnuel').value) || salaireMensuel * 12;

    const depenses = {
        loyer: parseFloat(document.getElementById('loyer').value),
        nourriture: parseFloat(document.getElementById('nourriture').value),
        factures: parseFloat(document.getElementById('factures').value),
        transport: parseFloat(document.getElementById('transport').value),
        abonnements: parseFloat(document.getElementById('abonnements').value),
        sorties: parseFloat(document.getElementById('sorties').value),
        voyages: parseFloat(document.getElementById('voyages').value),
        argentDePoche: parseFloat(document.getElementById('argentDePoche').value),
        autres: parseFloat(document.getElementById('autres').value),
    };

    const depensesTotales = Object.values(depenses).reduce((a, b) => a + b, 0);
    const epargne = salaireMensuel - depensesTotales;

    const ctx = document.getElementById('cercleFinancier').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Loyer', 'Nourriture', 'Factures', 'Transport', 'Abonnements', 'Sorties', 'Voyages', 'Argent de poche', 'Autres'],
            datasets: [{
                data: Object.values(depenses),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#E7E9ED', '#FF4500']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const data = tooltipItem.raw;
                            const total = depensesTotales;
                            const percentage = ((data / total) * 100).toFixed(2);
                            return `${tooltipItem.label}: ${percentage}%`;
                        }
                    }
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        const total = ctx.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    },
                    color: '#fff',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    const remarques = document.getElementById('remarques');
    if (epargne > 0) {
        remarques.innerText = `Votre situation financière est stable. Vous économisez ${epargne.toFixed(2)} € par mois.`;
    } else if (epargne === 0) {
        remarques.innerText = "Vous atteignez juste l'équilibre financier.";
    } else {
        remarques.innerText = `Votre situation est difficile. Vous dépassez votre budget mensuel de ${Math.abs(epargne.toFixed(2))} €.`;
    }
}

// Fonction pour proposer une meilleure gestion financière
function proposerPlanFinancier() {
    const remarques = document.getElementById('remarques');
    remarques.innerText += '\n\n💡 Conseil : Essayez de réduire vos dépenses non essentielles comme les abonnements ou les sorties. Fixez un objectif d’épargne d’au moins 10% de votre revenu mensuel.';
}
