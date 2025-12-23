import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# ✅ This file is ONLY for calculations and graphs.

def get_metrics_text(model, X_test, y_test):
    # Predict
    y_pred = model.predict(X_test)
    
    # Calculate metrics (zero_division=0 prevents warnings/crashes)
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    
    return f"""Performance Metrics:
--------------------
Accuracy :  {acc:.2f} 
Precision:  {prec:.2f}
Recall   :  {rec:.2f}
F1 Score :  {f1:.2f}"""

def get_confusion_matrix_figure(model, X_test, y_test):
    y_pred = model.predict(X_test)
    
    # Generate Matrix
    cm = confusion_matrix(y_test, y_pred, labels=[0, 1])

    # Plot
    fig, ax = plt.subplots(figsize=(6, 5))
    cax = ax.matshow(cm, cmap='Blues')  # Blue gradient
    fig.colorbar(cax)

    # Add Text Annotations
    for i in range(2):
        for j in range(2):
            value = cm[i, j]
            # Dynamic text color (white on dark blue, black on light)
            color = "white" if value > cm.max() / 2 else "black"
            ax.text(j, i, f"{value}", va='center', ha='center',
                    fontsize=18, fontweight='bold', color=color)

    # Set Labels (User Friendly)
    class_names = ['Normal', 'Thalassemia']
    
    ax.set_xticks([0, 1])
    ax.set_yticks([0, 1])
    
    # Move x-axis labels to bottom
    ax.xaxis.set_ticks_position('bottom')
    
    ax.set_xticklabels(class_names, fontsize=11)
    ax.set_yticklabels(class_names, fontsize=11, rotation=90, va='center')
    
    ax.set_xlabel('Predicted Label', fontsize=12, fontweight='bold')
    ax.set_ylabel('True Label', fontsize=12, fontweight='bold')
    ax.set_title('Confusion Matrix', fontsize=14, pad=15)
    
    plt.tight_layout()
    return fig

def get_feature_importance_figure(model, X_test):
    importances = model.feature_importances_
    
    # Plot
    fig, ax = plt.subplots(figsize=(8, 6))
    
    # Sort importances
    sorted_idx = np.argsort(importances)
    
    # Create horizontal bar chart
    ax.barh(range(len(importances)), importances[sorted_idx], align='center', color='skyblue', edgecolor='navy')
    
    ax.set_yticks(range(len(importances)))
    
    # Ensure X_test columns align with sorted indices
    features = np.array(X_test.columns)
    ax.set_yticklabels(features[sorted_idx], fontsize=10)
    
    ax.set_xlabel("Importance Score")
    ax.set_title("Feature Importance (Which inputs matter most?)", fontsize=12)
    
    plt.tight_layout()
    return fig
print("✅ metrics code run successfully!")    