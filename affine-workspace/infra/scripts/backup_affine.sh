#!/bin/bash
# Backup AFFiNE data (database and uploads)
# Usage: ./backup_affine.sh [backup_name]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="$INFRA_DIR/../affine-backups/exports"

# Generate backup name with timestamp
BACKUP_NAME="${1:-affine-backup-$(date +%Y%m%d-%H%M%S)}"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"

echo "💾 Backing up AFFiNE Workspace..."
echo "=================================="
echo "Backup name: $BACKUP_NAME"
echo ""

# Create backup directory
mkdir -p "$BACKUP_PATH"

cd "$INFRA_DIR"

# Backup PostgreSQL database
echo "📊 Backing up PostgreSQL database..."
docker compose exec -T postgres pg_dump -U affine affine > "$BACKUP_PATH/database.sql"

# Backup uploads/storage
echo "📁 Backing up file storage..."
docker compose cp affine_app:/app/storage "$BACKUP_PATH/storage"

# Create backup metadata
cat > "$BACKUP_PATH/backup-info.txt" <<EOF
AFFiNE Backup Information
=========================
Backup Date: $(date)
Backup Name: $BACKUP_NAME
Database: PostgreSQL dump
Storage: Files copied from /app/storage

Restore Instructions:
---------------------
1. Stop AFFiNE: ./stop_affine.sh
2. Restore database: docker compose exec -T postgres psql -U affine affine < database.sql
3. Restore storage: docker compose cp storage affine_app:/app/storage
4. Start AFFiNE: ./start_affine.sh
EOF

# Create compressed archive
echo "🗜️  Compressing backup..."
cd "$BACKUP_DIR"
tar -czf "$BACKUP_NAME.tar.gz" "$BACKUP_NAME"

# Calculate size
BACKUP_SIZE=$(du -sh "$BACKUP_NAME.tar.gz" | cut -f1)

echo ""
echo "✅ Backup completed successfully!"
echo ""
echo "📦 Backup location: $BACKUP_PATH"
echo "📦 Archive: $BACKUP_NAME.tar.gz ($BACKUP_SIZE)"
echo ""
echo "💡 Tip: Consider copying this backup to external storage!"
echo ""
